export default {
    // #ifndef H5
    baseUrl:"http://192.168.1.4:7001",
    // #endif
	
    // #ifdef H5
    baseUrl:"/api",
    // #endif
    socketUrl:"ws://192.168.1.4:7001/ws",
	
    env:"dev",
	
	codeUrl:"http://192.168.1.4:7001",
}