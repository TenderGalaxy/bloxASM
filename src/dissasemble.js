
function dissasemble( instruction){
	opCodes = {
		0x0000: "ADD",
		0x0200: "BGE",
		0x0400: "NOR",
		0x0600: "RSH",
		0x0800: "LOD",
		0x0A00: "STR",
		0x0C00: "IN" ,
		0x0E00: "OUT",
		0x0F00: "PRI"
	}
	let regs = {
		0: "R0",
		1: "R1",
		2: "R2",
		3: "R3",
		4: "R4",
		5: "R5",
		6: "SP",
		7: "PC",
	}

	op1 = (instruction & 0x01C0) >> 6
	op2 = (instruction & 0x0038) >> 3
	op3 = (instruction & 0x0007)

	opCode = opCodes[opCode]

	op1 = regs[op1]
	op2 = regs[op2]
	op3 = regs[op3]

	switch (opCode){
		case "ADD":
		case "BGE":
		case "NOR":
			return `${opCode} ${op1} ${op2} ${op3} `
			break
		case "OUT":
			return `${opCode} %TEXT ${op2}`
			break
		case "RSH":
		case "LOD":
			return `${opCode} ${op1} ${op2}`
			break
		case "STR":
			return `${opCode} ${op2} ${op3}`
			break
		case "PRI":
			return `${opCode} ${op1}`
			break
		default:
			break
	}
}
