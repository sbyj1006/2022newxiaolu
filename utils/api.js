const API_BASE = "https://qf-restapi.mdscj.com/xp_express";

//快递100接口，根据快递单号查询快递详情
const getExpressBy100 = "/kuaidi100/query"

//快递100接口，根据快递单号查询快递公司
const getCompanyBy100 = "/kuaidi100/query-company-quickly"

const API_EXPRESS_100 = API_BASE + getExpressBy100;
const API_COMPANY_100 = API_BASE + getCompanyBy100;

module.exports = {
  API_EXPRESS_100: API_EXPRESS_100,
  API_COMPANY_100: API_COMPANY_100
}