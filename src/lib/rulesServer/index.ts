import { EventEmitter } from "stream";
import storage from "../../common/storage";

export default (server: EventEmitter /* , options */) => {
  server.on("request", (_req: Req, res) => {
    const rules = storage.getTextRules();
    res.end(rules);
  });
};

interface Req {
  /** 请求的客户端IP，注意：挂在req里面 */
  clientIp: string;
  originalReq: {
    /** 请求的ID，每个请求对应一个唯一的ID */
    id: string;
    /** 请求的原始headers，而req.headers包含了一些插件自定义字段 */
    headers: Record<string, any>;
    /** 配置的规则值， 如：whistle.xxx://ruleValue */
    ruleValue: string;
    /** 请求的完整 url */
    url: string;
    /** 请求的真实url，一般为空 */
    realUrl: string;
    /** 请求方法 */
    method: string;
    /** 请求的客户端端口 */
    clientPort: number;
    /** pattern @globalValue */
    globalValue: string;
    /** 配置的代理规则，一般为空 */
    proxyValue: string;
    /** 配置的pac规则，一般为空 */
    pacValue: string;
  };
  originalRes: {
    /** 服务端IP，只有在server或resServer、resStatsServer才能获取到 */
    serverIp: string;
    /** 响应状态码，同 oRes.serverIp */
    statusCode: number;
  };
}
