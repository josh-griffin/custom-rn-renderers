import ReactReconciler from "react-reconciler";
import gui from "gui";

const tracerWrapper = (hostConfig) =>
  Object.keys(hostConfig).reduce((acc, key) => {
    return {
      ...acc,
      [key]: (...args) => {
        console.trace(key);
        return hostConfig[key](...args);
      },
    };
  }, {});

const rootHostContext = {};
const childHostContext = {};

const hostConfig = {
  clearContainer: () => console.log("clear the container"),
  now: Date.now,
  getRootHostContext: () => {
    return rootHostContext;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return childHostContext;
  },
  shouldSetTextContent: () => {
    return false;
  },
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress
  ) => {
    const yueElement = gui.Container.create();
    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (type !== "text") {
          if (typeof propValue === "string" || typeof propValue === "number") {
            throw new Error(
              "Text strings must be rendered within a <Text> component."
            );
          }

          if (propValue instanceof Array) {
            propValue.forEach((item) => {
              if (typeof item === "string") {
                throw new Error(
                  "Text strings must be rendered within a <Text> component."
                );
              }
            });
          }
        }
      } else if (propName === "style") {
        yueElement.setStyle(propValue);
      }
    });
    return yueElement;
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) => {
    return gui.Label.create(text);
  },
  appendInitialChild: (parent, child) => {
    parent.addChildView(child);
  },
  appendChild(parent, child) {
    parent.addChildView(child);
  },
  finalizeInitialChildren: (yueElement, type, props) => {},
  supportsMutation: true,
  appendChildToContainer: (parent, child) => {
    parent.setContentView(child);
  },
  prepareUpdate(yueElement, oldProps, newProps) {
    return true;
  },
  commitUpdate(yueElement, updatePayload, type, oldProps, newProps) {},
  commitTextUpdate(textInstance, oldText, newText) {},
  removeChild(parentInstance, child) {},
};
const ReactReconcilerInstance = ReactReconciler(tracerWrapper(hostConfig));

const GuiRenderer = {
  render: (reactElement, guiWindow, callback) => {
    if (!guiWindow._rootContainer) {
      guiWindow._rootContainer = ReactReconcilerInstance.createContainer(
        guiWindow,
        false
      );
    }

    return ReactReconcilerInstance.updateContainer(
      reactElement,
      guiWindow._rootContainer,
      null,
      callback
    );
  },
};

export default GuiRenderer;
