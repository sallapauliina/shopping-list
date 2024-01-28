import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as ShoppingListController from "./controllers/shoppingListController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});
const handleRequest = async (request) => {
  const url = new URL(request.url);

  switch (true) {
    case (url.pathname === "/lists" && request.method === "GET"):
      return await ShoppingListController.viewAllLists(request);

    case (url.pathname === "/" && request.method === "GET"):
      return await ShoppingListController.mainFunction(request);

    case (url.pathname === "/lists" && request.method === "POST"):
      return await ShoppingListController.addToList(request);

    case (url.pathname.match("lists/[0-9]+/items/[0-9]+") &&
      request.method === "POST"):
      return await ShoppingListController.crossingOver(request);

    case (url.pathname.match("lists/[0-9]+/items") &&
      request.method === "POST"):
      return await ShoppingListController.newItem(request);

    case (url.pathname.match("lists/[0-9]+/deactivate") &&
      request.method === "POST"):
      return await ShoppingListController.deleteTheList(request);

    case (url.pathname.match("lists/[0-9]+") && request.method === "GET"):
      return await ShoppingListController.List(request);

    default:
      return await ShoppingListController.mainFunction(request);
  }
};

serve(handleRequest, { port: 7777 });
