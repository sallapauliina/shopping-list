import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListController from "./controllers/shoppingListController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  switch (true) {
    case request.method === "GET" && url.pathname === "/lists":
      return await shoppingListController.viewAllLists(request);

    case request.method === "GET" && url.pathname === "/":
      return await shoppingListController.mainFunction(request);

    case request.method === "POST" && url.pathname === "/lists":
      return await shoppingListController.addToList(request);

    case request.method === "POST" &&
      url.pathname.match("lists/[0-9]+/items/+[0-9]"):
      return await shoppingListController.crossingOver(request);

    case request.method === "POST" && url.pathname.match("lists/[0-9]+/items"):
      return await shoppingListController.NewItem(request);

    case request.method === "POST" &&
      url.pathname.match("lists/[0-9]+/deactivate"):
      return await shoppingListController.deleteTheList(request);

    case request.method === "GET" && url.pathname.match("lists/[0-9]"):
      return await shoppingListController.List(request);

    default:
      return await shoppingListController.mainFunction(request);
  }
};

serve(handleRequest, { port: 7777 });
