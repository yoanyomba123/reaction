export const appName = "TRYSHOP";
export const free10 = true;
export const freeCount = 5;
export const baseFee = 0;
export const feePerItem = 1;
export const maxOrderTotal = 1500;
export const maxOrderItemsCount = 10;

stripeKey = "pk_live_q9eLgJcNrJzjiy0qjcAeYpjW"

export const stripePubApiKey = stripeKey
export const appsFlyerOptions = {
  devKey:  "fRFuZFsSf7zfAgCuqvTHUc",
  appId: "1167262019",
}

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}


export const priceRange = "p22:38";
