import Factory, { createFactoryForSchema } from "/imports/test-utils/helpers/factory";
import createOrder, { inputSchema } from "./createOrder";
import mockContext from "/imports/test-utils/helpers/mockContext";

createFactoryForSchema("CreateOrderInput", inputSchema);

test("throws access denied if guest checkout is disabled and no accountId", async () => {
  const shop = Factory.Shop.makeOne({
    isGuestCheckoutAllowed: false
  });
  const input = Factory.CreateOrderInput.makeOne();
  const createPaymentForFulfillmentGroup = () => {};

  mockContext.accountId = null;
  mockContext.collections.Shops.findOne.mockReturnValueOnce(Promise.resolve(shop));

  const promise = createOrder(mockContext, { ...input, createPaymentForFulfillmentGroup });
  return expect(promise).rejects.toThrowErrorMatchingSnapshot();
});
