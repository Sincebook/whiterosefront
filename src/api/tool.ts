import { message } from 'antd';

export const handleRequestHeader = (config: any) => {
	config['xxxx'] = 'xxx'
	return config
}

export const handleAuth = (config: any) => {
    config.header['token'] = localStorage.getItem('token') || "";
    return config;
}


export const handleGeneralError = (code: string, errmsg: string): boolean => {
	if (code !== '0') {
		message.error(errmsg)
        return false;
	}
	return true
}

export const handleNetworkError = (errStatus?: number): void => {
    const networkErrMap: any = {
        "400": "错误的请求",
        "401": "未授权，请重新登录",
        "403": "拒绝访问",
        "404": "请求错误，未找到该资源",
        "405": "请求方法未允许",
        "408": "请求超时",
        "500": "服务器端出错",
        "501": "网络未实现",
        "502": "网络错误",
        "503": "服务不可用",
        "504": "网络超时",
        "505": "http版本不支持该请求",
    }
    if (errStatus) {
        message.error(networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`);
        return;
    }
    message.error('无法连接到服务器！');
}