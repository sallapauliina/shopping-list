import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListController from "./controllers/shoppingListController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  switch (true) {
    case url.pathname === "/" && request.method === "GET":
      return await shoppingListController.mainFunction(request);

    case url.pathname === "/lists" && request.method === "GET":
      return await shoppingListController.viewAllLists(request);

    case url.pathname === "/lists" && request.method === "POST":
      return await shoppingListController.addToList(request);

    case url.pathname.match("lists/[0-9]+/items/+[0-9]") &&
      request.method === "POST":
      return await shoppingListController.crossingOver(request);

    case url.pathname.match("lists/[0-9]+") && request.method === "GET":
      return await shoppingListController.List(request);

    case url.pathname.match("lists/[0-9]+/items") && request.method === "POST":
      return await shoppingListController.NewItem(request);

    case url.pathname.match("lists/[0-9]+/deactivate") &&
      request.method === "POST":
      return await shoppingListController.deleteTheList(request);

    default:
      return await shoppingListController.mainFunction(request);
  }
};
serve(handleRequest, { port: 7777 });
