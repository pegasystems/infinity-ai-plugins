---
name: json-dt-array-nested-objects
description: JSON DT using manual SET, UPDATE_PAGE ("For JSON only"), and APPEND_AND_MAP_TO on an Array top-level DT. Handles JSON-to-property name mismatches, nested JSON objects mapped to flat clipboard properties, and a JSON array mapped to a Page List.
---

```json
{
  "pyModelName": "CandidateResponse_LISTJSON",
  "pyLabel": "CandidateResponse_LISTJSON",
  "pyClassName": "Code-Pega-List",
  "pyDataModelFormat": "JSON",
  "pyParameters": [
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "jsonData",
      "pyParametersParamDesc": "The incoming or outgoing JSON data.",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "0"
    },
    {
      "pxObjClass": "Embed-MethodParams",
      "pyParametersParamName": "executionMode",
      "pyParametersParamDefaultValue": "DESERIALIZE",
      "pyParametersParamDesc": "Direction to execute the mapping in: SERIALIZE or DESERIALIZE",
      "pyParametersParamInOut": "IN",
      "pyParametersParamType": "STRING",
      "pyParametersParamReq": "-1"
    }
  ],
  "pyPagesAndClasses": [
    {
      "pxObjClass": "Embed-PagesAndClasses",
      "pyPagesAndClassesPage": ".pxResults",
      "pyPagesAndClassesClass": "MyOrg-MyApp-Data-Candidate"
    }
  ],
  "pyMappingModel": {
    "pxObjClass": "Rule-Obj-Mapping-JSON",
    "pyClassName": "Code-Pega-List",
    "pyTopLevelElement": "Array",
    "pyArrayElements": "Objects",
    "pyListProperty": ".pxResults",
    "pyAutomapAll": "false",
    "pyCreateMultiDimArrays": "false",
    "pyDateFormat": "Default",
    "hiddenMappingsWarningAdded": "false",
    "pyProperties": [
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "SET",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": ".Id",
        "pyPropertiesValue": "id",
        "pyProperties": []
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "SET",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": ".FirstName",
        "pyPropertiesValue": "firstName",
        "pyProperties": []
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "SET",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": ".LastName",
        "pyPropertiesValue": "lastName",
        "pyProperties": []
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "UPDATE_PAGE",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": "",
        "pyPropertiesValue": "contactInfo",
        "pyUpdateContextOptions": "JSON",
        "hiddenMappingsWarningAdded": "false",
        "pyProperties": [
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Email",
            "pyPropertiesValue": "emailAddress",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Phone",
            "pyPropertiesValue": "phoneNumber",
            "pyProperties": []
          }
        ]
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "UPDATE_PAGE",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": "",
        "pyPropertiesValue": "employment",
        "pyUpdateContextOptions": "JSON",
        "hiddenMappingsWarningAdded": "false",
        "pyProperties": [
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".JobTitle",
            "pyPropertiesValue": "jobTitle",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Department",
            "pyPropertiesValue": "department",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".ManagerId",
            "pyPropertiesValue": "managerId",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Status",
            "pyPropertiesValue": "status",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".BasePay",
            "pyPropertiesValue": "salary",
            "pyProperties": []
          }
        ]
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "UPDATE_PAGE",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": "",
        "pyPropertiesValue": "address",
        "pyUpdateContextOptions": "JSON",
        "hiddenMappingsWarningAdded": "false",
        "pyProperties": [
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Street",
            "pyPropertiesValue": "street",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".City",
            "pyPropertiesValue": "city",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".State",
            "pyPropertiesValue": "state",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".PostalCode",
            "pyPropertiesValue": "postalCode",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Candidate",
            "pyPageRef": "",
            "pyPropertiesName": ".Country",
            "pyPropertiesValue": "country",
            "pyProperties": []
          }
        ]
      },
      {
        "pxObjClass": "Embed-MappingParams",
        "pyActionName": "APPEND_AND_MAP_TO",
        "pyElementType": "Objects",
        "pyPageClass": "MyOrg-MyApp-Data-Candidate",
        "pyPageRef": "",
        "pyPropertiesName": ".Certifications",
        "pyPropertiesValue": "certifications",
        "pyExpanded": "true",
        "hiddenMappingsWarningAdded": "false",
        "pyProperties": [
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Certification",
            "pyPageRef": ".Certifications",
            "pyPropertiesName": ".CertificationName",
            "pyPropertiesValue": "name",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Certification",
            "pyPageRef": ".Certifications",
            "pyPropertiesName": ".IssuedDate",
            "pyPropertiesValue": "issuedDate",
            "pyProperties": []
          },
          {
            "pxObjClass": "Embed-MappingParams",
            "pyActionName": "SET",
            "pyElementType": "Objects",
            "pyPageClass": "MyOrg-MyApp-Data-Certification",
            "pyPageRef": ".Certifications",
            "pyPropertiesName": ".CertificationLevel",
            "pyPropertiesValue": "level",
            "pyProperties": []
          }
        ]
      }
    ]
  }
}
```
