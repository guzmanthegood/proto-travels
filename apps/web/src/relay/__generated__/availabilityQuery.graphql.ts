/**
 * @generated SignedSource<<eae391e7a544475ef0709f8d508f1406>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CategoryTypeEnum = "D" | "F" | "SF" | "ST" | "T" | "%future added value";
export type FilterTypeEnum = "AVAILONLY" | "AVLHEAVY" | "BESTARRANGMENT" | "BESTCONTRACT" | "BESTPRICE" | "BESTROOMBASIS" | "EXCLUDEDYNAMIC" | "EXCLUDENONREF" | "REDUCED" | "%future added value";
export type RoomTypeEnum = "DBL" | "FAM" | "QUD" | "SGL" | "STR" | "TRP" | "TSU" | "TWN" | "%future added value";
export type DetailsInputObject = {
  age?: string | null | undefined;
  cot?: string | null | undefined;
  extrabed?: boolean | null | undefined;
  occupancy?: string | null | undefined;
  required?: string | null | undefined;
  type?: RoomTypeEnum | null | undefined;
};
export type availabilityQuery$variables = {
  after?: string | null | undefined;
  category?: CategoryTypeEnum | null | undefined;
  checkin: string;
  checkout: string;
  city?: string | null | undefined;
  details: ReadonlyArray<DetailsInputObject>;
  filters?: ReadonlyArray<FilterTypeEnum | null | undefined> | null | undefined;
  first?: number | null | undefined;
  latitude?: string | null | undefined;
  longitude?: string | null | undefined;
  nationality: string;
  stars: ReadonlyArray<string>;
};
export type availabilityQuery$data = {
  readonly availability: {
    readonly hotels: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly address: string | null | undefined;
          readonly agreements: ReadonlyArray<{
            readonly available: string | null | undefined;
            readonly cancelationPolicies: ReadonlyArray<string | null | undefined> | null | undefined;
            readonly id: string | null | undefined;
            readonly mealBasis: string | null | undefined;
            readonly roomBasis: string | null | undefined;
            readonly roomType: string | null | undefined;
            readonly rooms: ReadonlyArray<{
              readonly occupancy: string | null | undefined;
              readonly price: ReadonlyArray<{
                readonly from: string | null | undefined;
                readonly price: string | null | undefined;
                readonly to: string | null | undefined;
              } | null | undefined> | null | undefined;
              readonly required: string | null | undefined;
              readonly type: string | null | undefined;
            } | null | undefined> | null | undefined;
            readonly special: string | null | undefined;
            readonly total: string | null | undefined;
          } | null | undefined> | null | undefined;
          readonly latitude: string | null | undefined;
          readonly longitude: string | null | undefined;
          readonly mainFacilities: {
            readonly airconditioning: boolean | null | undefined;
            readonly gym: boolean | null | undefined;
            readonly helpForDisabled: boolean | null | undefined;
            readonly internet: boolean | null | undefined;
            readonly nonsmoking: boolean | null | undefined;
            readonly parking: boolean | null | undefined;
            readonly poolHeated: boolean | null | undefined;
            readonly sauna: boolean | null | undefined;
          } | null | undefined;
          readonly name: string | null | undefined;
          readonly pictures: ReadonlyArray<string | null | undefined> | null | undefined;
          readonly position: {
            readonly center_distance: number | null | undefined;
          } | null | undefined;
          readonly stars: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean | null | undefined;
      };
    } | null | undefined;
  } | null | undefined;
};
export type availabilityQuery = {
  response: availabilityQuery$data;
  variables: availabilityQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "category"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "checkin"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "checkout"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "city"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "details"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "filters"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "latitude"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "longitude"
},
v10 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nationality"
},
v11 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "stars"
},
v12 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "category",
    "variableName": "category"
  },
  {
    "kind": "Variable",
    "name": "checkin",
    "variableName": "checkin"
  },
  {
    "kind": "Variable",
    "name": "checkout",
    "variableName": "checkout"
  },
  {
    "kind": "Variable",
    "name": "city",
    "variableName": "city"
  },
  {
    "kind": "Variable",
    "name": "details",
    "variableName": "details"
  },
  {
    "kind": "Variable",
    "name": "filters",
    "variableName": "filters"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "latitude",
    "variableName": "latitude"
  },
  {
    "kind": "Variable",
    "name": "longitude",
    "variableName": "longitude"
  },
  {
    "kind": "Variable",
    "name": "nationality",
    "variableName": "nationality"
  },
  {
    "kind": "Variable",
    "name": "stars",
    "variableName": "stars"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "AvailabilityHotelConnection",
  "kind": "LinkedField",
  "name": "hotels",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AvailabilityHotelEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AvailabilityHotel",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "stars",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "address",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "pictures",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "latitude",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "longitude",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AvailabilityPosition",
              "kind": "LinkedField",
              "name": "position",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "center_distance",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AvailabilityMainFacilities",
              "kind": "LinkedField",
              "name": "mainFacilities",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "nonsmoking",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "parking",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "gym",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "sauna",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "poolHeated",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "helpForDisabled",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internet",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "airconditioning",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AvailabilityAgreement",
              "kind": "LinkedField",
              "name": "agreements",
              "plural": true,
              "selections": [
                (v13/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "total",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "available",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "roomType",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "roomBasis",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mealBasis",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "special",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cancelationPolicies",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "AvailabilityRoom",
                  "kind": "LinkedField",
                  "name": "rooms",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "type",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "required",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "occupancy",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "AvailabilityPrice",
                      "kind": "LinkedField",
                      "name": "price",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "from",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "to",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "price",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AvailabilityHotelPageInfo",
      "kind": "LinkedField",
      "name": "pageInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "endCursor",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasNextPage",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "availabilityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v12/*: any*/),
        "concreteType": "Availability",
        "kind": "LinkedField",
        "name": "availability",
        "plural": false,
        "selections": [
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v10/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v5/*: any*/),
      (v11/*: any*/),
      (v1/*: any*/),
      (v7/*: any*/),
      (v0/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/)
    ],
    "kind": "Operation",
    "name": "availabilityQuery",
    "selections": [
      {
        "alias": null,
        "args": (v12/*: any*/),
        "concreteType": "Availability",
        "kind": "LinkedField",
        "name": "availability",
        "plural": false,
        "selections": [
          (v14/*: any*/),
          (v13/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f3057aeac247a1911bf08e4af00e42b2",
    "id": null,
    "metadata": {},
    "name": "availabilityQuery",
    "operationKind": "query",
    "text": "query availabilityQuery(\n  $nationality: String!\n  $checkin: String!\n  $checkout: String!\n  $city: String\n  $filters: [FilterTypeEnum]\n  $details: [DetailsInputObject!]!\n  $stars: [String!]!\n  $category: CategoryTypeEnum\n  $first: Int\n  $after: String\n  $latitude: String\n  $longitude: String\n) {\n  availability(nationality: $nationality, filters: $filters, checkin: $checkin, checkout: $checkout, category: $category, city: $city, details: $details, stars: $stars, first: $first, after: $after, latitude: $latitude, longitude: $longitude) {\n    hotels {\n      edges {\n        node {\n          name\n          stars\n          address\n          pictures\n          latitude\n          longitude\n          position {\n            center_distance\n          }\n          mainFacilities {\n            nonsmoking\n            parking\n            gym\n            sauna\n            poolHeated\n            helpForDisabled\n            internet\n            airconditioning\n          }\n          agreements {\n            id\n            total\n            available\n            roomType\n            roomBasis\n            mealBasis\n            special\n            cancelationPolicies\n            rooms {\n              type\n              required\n              occupancy\n              price {\n                from\n                to\n                price\n              }\n            }\n          }\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "64538ca2d14f1a574b96869bedf139d1";

export default node;
