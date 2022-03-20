import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import { homePage, detailsPage } from './utility-methods'

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication('@thabo/dummy-1',
  () => System.import('@thabo/dummy-1'), homePage);
registerApplication('@thabo/dummy-2',
  () => System.import('@thabo/dummy-2'), detailsPage);
registerApplication('@thabo/navigation',
  () => System.import('@thabo/navigation'), () => true);

// applications.forEach(registerApplication);
layoutEngine.activate();
start();
