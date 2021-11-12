export default {
	state:{
		events: []
	},
	mutations: {
		// 注册audio事件
		regEvent(state,event) {
			state.events.push(event)
		},
		// 消费事件
		doEvent(state,params) {
			state.events.forEach(e => {
				console.log('消费',params);
				e(params)
			})
		},
		// 注销事件
		destoryEvent(state,currentEvent) {
			let index = state.events.findIndex(event => event === currentEvent )
			if(index !== -1) {
				state.events.splice(index,1)
			}
		}
	},
	actions:{
		// 全局注册事件
		audioOn({commit},event) {
			commit('regEvent',event)
		},
		// 全局消费事件
		audioEmit({commit},params) {
			commit('doEvent',params)
		},
		// 全局注销事件
		audioOff({commit},currentEvent) {
			commit('destoryEvent',currentEvent)
		}
	}
}