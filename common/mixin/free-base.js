import $Time from "@/common/free-lib/time.js"

export default {
	filters: {
		formatTime(timeStamp) {
			return $Time.gettime(timeStamp)
		}
	},
}