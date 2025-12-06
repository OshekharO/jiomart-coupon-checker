import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    console.warn("⚠️ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => { data += chunk; });
      req.on("end", () => {
        try {
          resolve(JSON.parse(data || "{}"));
        } catch (err) {
          reject(err);
        }
      });
    });

    const { 
      voucher_code, 
      bb_txn_id, 
      po_id,
      csurftoken,
      cookie,
      new_wallet_flow = true,
      context = "checkout",
      operation = "apply",
      neucoins = true
    } = body;

    if (!voucher_code || !bb_txn_id || !po_id || !csurftoken || !cookie) {
      console.error("❌ Missing fields:", body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Ensure po_id is a number
    const poIdNum = typeof po_id === 'number' ? po_id : parseInt(po_id, 10);
    
    // Clean up cookie string - remove all escape sequences that may have been copied from DevTools
    // Handle multiple levels of escaping: \\\" -> \" -> "
    let cleanCookie = cookie;
    // Remove all backslashes before quotes
    cleanCookie = cleanCookie.replace(/\\+"/g, '"');
    // Remove remaining backslashes (but keep single backslashes in other contexts)
    cleanCookie = cleanCookie.replace(/\\{2,}/g, '');

    console.log("🚀 Checking BigBasket coupon:", voucher_code, "| PO ID:", poIdNum);

    const response = await axios.post(
      "https://www.bigbasket.com/order/v2/potentialorder/voucher",
      {
        new_wallet_flow,
        context,
        bb_txn_id,
        voucher_code,
        operation,
        neucoins,
        po_id: poIdNum
      },
      {
        headers: {
          "accept": "*/*",
          "accept-language": "en-GB",
          "content-type": "application/json",
          "priority": "u=1, i",
          "sec-ch-ua": '"Chromium";v="127", "Not)A;Brand";v="99", "Microsoft Edge Simulate";v="127", "Lemur";v="127"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-caller": "bigbasket-pwa",
          "x-channel": "BB-PWA",
          "x-csurftoken": csurftoken,
          "x-entry-context": "bbnow",
          "x-entry-context-id": "10",
          "x-tracker": bb_txn_id,
          "cookie": cleanCookie
        }
      }
    );

    console.log("✅ BigBasket coupon result:", voucher_code, "| Data:", response.data);

    return res.status(200).json({ voucher_code, result: response.data });
  } catch (err) {
    console.error("❌ Error for BigBasket coupon:", body?.voucher_code, "|", err.message);
    return res.status(500).json({
      error: err.response?.data || err.message
    });
  }
}
