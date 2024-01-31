import * as shoppingListService from "../services/shoppingListService.js";
import { renderFile } from "../deps.js";
import * as utils from "../utils/utils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const NewItem = async (request) => {
  const url = new URL(request.url);
  const splitUrl = url.pathname.split("/");
  const formsData = await request.formData();
  const name = formsData.get("name");
  console.log(splitUrl[2], name, url.pathname);
  await shoppingListService.createAnItem(splitUrl[2], name);
  return utils.redirectTo("/lists/" + splitUrl[2]);
};

const viewAllLists = async () => {
  const data = {
    lists: await shoppingListService.findAllActiveLists(),
  };
  return new Response(
    await renderFile("./createLists.eta", data),
    responseDetails
  );
};

const List = async (request) => {
  const url = new URL(request.url);
  const splitUrl = url.pathname.split("/");
  console.log("id", splitUrl[2]);
  const data = {
    specificList: await shoppingListService.findListById(splitUrl[2]),
    activeItems: await shoppingListService.findAllActiveItems(splitUrl[2]),
    NonActiveItems: await shoppingListService.findNonActiveItems(splitUrl[2]),
  };
  return new Response(
    await renderFile("/showLists.eta", data),
    responseDetails
  );
};

const addToList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await shoppingListService.createLists(name);
  return utils.redirectTo("/lists");
};

const deleteTheList = async (request) => {
  const url = new URL(request.url);
  const splitUrl = url.pathname.split("/");
  await shoppingListService.changeToNonActive(splitUrl[2]);
  return utils.redirectTo("/lists");
};

const crossingOver = async (request) => {
  const url = new URL(request.url);
  const splitUrl = url.pathname.split("/");

  await shoppingListService.crossingItemOfTheList(splitUrl[4]);
  return utils.redirectTo("/lists/" + splitUrl[2]);
};

const mainFunction = async () => {
  const allLists = await shoppingListService.findEveryList();
  const allItems = await shoppingListService.findEveryItem();

  const data = {
    items: allItems,
    lists: allLists,
  };
  return new Response(
    await renderFile("./mainPage.eta", data),
    responseDetails
  );
};

export {
  NewItem,
  crossingOver,
  List,
  addToList,
  viewAllLists,
  deleteTheList,
  mainFunction,
};
