import Vue from 'vue'
import Vuex from 'vuex'
import audio from './modules/audio.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		audio
	}
})