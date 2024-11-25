function isValidCI(ci) {
	var isNumeric = true
	var total = 0,
		individual

	for (var position = 0; position < 10; position++) {
		individual = ci.toString().substring(position, position + 1)

		if (isNaN(individual)) {
			isNumeric = false
			break
		} else {
			if (position < 9) {
				if (position % 2 == 0) {
					if (parseInt(individual) * 2 > 9) {
						total += 1 + ((parseInt(individual) * 2) % 10)
					} else {
						total += parseInt(individual) * 2
					}
				} else {
					total += parseInt(individual)
				}
			}
		}
	}

	if (total % 10 != 0) {
		total = total - (total % 10) + 10 - total
	} else {
		total = 0
	}

	if (isNumeric) {
		if (ci.toString().length != 10) return false
		if (parseInt(ci, 10) == 0) return false
		if (total != parseInt(individual)) return false

		return true
	}

	return false
}

export { isValidCI }
