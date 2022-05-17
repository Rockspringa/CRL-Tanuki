import { RepresentTree } from "@crl-rocks/crl-compiler";

export const getTreantLikeData = (
  data: RepresentTree,
  id: string,
  type: GraphType
): any => {
  switch (type) {
    case GraphType.FunctionTree:
      return {
        chart: { container: id },
        connectors: { type: "curve" },
        nodeStructure: { ...getFunctionBody(data) },
      };

    case GraphType.ExpressionTree:
      return {
        chart: { container: id },
        connectors: { type: "straight" },
        nodeStructure: { ...getExpressionBody(data) },
      };
  }
};

const getFunctionBody = (data: RepresentTree): any => {
  return {
    text: { name: data.represent },
    children: data.children?.map((rep) => getFunctionBody(rep)),
  };
};

const getExpressionBody = (data: RepresentTree): any => {
  return {
    text: { name: data.represent, title: data.type },
    children: data.children?.map((rep) => getExpressionBody(rep)),
  };
};

export enum GraphType {
  FunctionTree,
  ExpressionTree,
}
