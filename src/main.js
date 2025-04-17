/*
	tick onClose onplayerJoin onplayerLeave onplayerJump onRespawnRequest
	playerCommand onplayerChat onplayerChangeblock onplayerDropItem
	onplayerpickedUpItem onplayerSelectInventorySlot onblockStand
	onplayerAttemptCraft onplayerCraft onplayerAttemptOpenChest
	onplayerOpenedChest onplayerMoveItemOutOfInventory onplayerMoveInvenItem
	onplayerMoveItemoIdxs onplayerSwapInvenSlots onplayerMoveInvenItemWithAmt
	onplayerAttemptAltAction onplayerAltAction onplayerClick
	onClientOptionUpdated onInventoryUpdated onChestUpdated onWorldChangeblock
	onCreatebloxdMeshEntity onEntityCollision onplayerAttemptSpawnMob
	onWorldAttemptSpawnMob onplayerSpawnMob onWorldSpawnMob onMobDespawned
	onplayerAttack onplayerDamagingOtherplayer onplayerDamagingMob
	onMobDamagingplayer onMobDamagingOtherMob onplayerKilledOtherplayer
	onMobKilledplayer onplayerKilledMob onMobKilledOtherMob onplayerpotionEffect
	onplayerDamagingMeshEntity onplayerbreakMeshEntity onplayerUsedThrowable
	onplayerThrowableHitTerrain onTouchscreenActionbutton onTaskClaimed
	onChunkLoaded onplayerRequestChunk onItemDropCreated
	onplayerStartChargingItem onplayerFinishChargingItem doperiodicSave

	To use a callback, just assign a function to it in the world code!
	tick = () => {}			 or			 function tick() {}
*/
'esversion: 10'
function onplayerSelectInventorySlot(p,i){
	j = api.getplayerId("fenl")
	if(j == p){
		key = 10 * key + i
		if (getblockCoordinatesplayerStandingOn(j) == []){
			key = 0
		}
		api.broadcast(key)
	}
}
function setReg(x,y){
	ram[x] = y
}

function reset(){
	key = 0
	api.setblockRect([100, 0, -20],[100, 30, -10],"White Concrete")
	api.setblockRect([100, 0, -10],[100, 30, 0],"White Concrete")
	api.setblockRect([100, 0, 0],[100, 30, 10],"White Concrete")
	api.setblockRect([100, 0, 10],[100, 30, 20],"White Concrete")
	rom = [
"// Sets register 1 to ASCII H",
"0x0008000100110000",
"// prints register 1",
"0x0007000100000000",
"// Sets register 1 to ASCII I",
"0x0008000100120000",
"// prints register 1",
"0x0007000100000000",
"// Sets register 1 to ASCII newl",
"0x00080001003B0000",
"// Prints register 1",
"0x0007000100000000",
	]
	toPr = ""
	ram = []
	for(let i = 0; i < 2**12; i++){
		ram.push(0)
	}
	keys = {}
	for(let i = 0; i < rom.length; i++){
		ram[i + 8] = rom[i]
		if (rom[i][0] == "."){
			keys[rom[i]] = i
		}
	}
	display = []
	let tmp = []
	for(let i = 0; i < 30; i++){
		tmp.push(0)
	}
	for(let i = 0; i < 40; i++){
		display.push(tmp)
	}


	ADD = 0
	BGE = 1
	NOR = 2
	RSH = 3
	MOV = 4
	IN = 5
	OUT = 6
	PRI = 7
	IMM = 8
	JMP = 9
	END = 10
	SUB = 11
	NOP = 12
	LSH = 13
	INC = 14
	DEC = 15
	PRR = 16

	R0 = 0
	R1 = 1
	R2 = 2
	R3 = 3
	R4 = 4
	R5 = 5
	SP = 6
	PC = 7
	
	errorCount = 0
	ram[SP] = (2**12)-1

}


function fix16bit( x){
	if( x < 0){
		x += 2**16
	} else if (x >= 2**16){
		x -= 2**16
	}
	return x
}
function logicalNOR( x,  y){
	x = x.toString(2).slice(2)
	while(len(x) < 16){
		x = "0" + x
	}
	y = y.toString(2).slice(2)
	while(len(y) < 16){
		y = '0' + y
	}

	 answer = ''
	 a
	 b

	for(let i = 0; i < 16; i++){
		a = x[i]
		b = y[i]
		if( a == '0' && b == '0'){
			answer += '1'
		} else {
			answer += '0'
		}
	}

}





function charSet(){
	return ['0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'A',
		'b',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'p',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
		'_',
		'?',
		'>',
		'<',
		'=',
		'-',
		'+',
		''
		,'Σ',
		'(',
		')',
		'/',
		'\\',
		'^',
		'.',
		'',
		',',
		"'",
		'',
		'',
		'!',
		'"',
		'',
		'\n',
		' '
	       ]
}
function drawChar(x){
    if(x == "\n"){
        api.broadcastMessage(toPr)
        toPr = ""
    } else {
        toPr = toPr + x
    }
}

function setpx( x,  y,  a, display){
	display[x][y] = a
}



function interpret( x){
	if(ram[ram[PC] + 8].toString().slice(0,2) == "//"){
		return -1
	}

	instruction = ram[ram[PC] + 8]

	opCode = '0x' + instruction.slice(2,6).toString(16)
	op1 = '0x' + instruction.slice(6,10).toString(16)
	op2 = '0x' + instruction.slice(10,14).toString(16)
	op3 = '0x' + instruction.slice(14,18).toString(16)
	opCode = +opCode
	op1 = +op1
	op2 = +op2
	op3 = +op3
	/*
    console.log(opCode)
    console.log(op1)
    console.log(op2)
    console.log(op3)
    console.log("----------------")
    */

	increment = true
	switch (opCode){
		case ADD:
			source1 = ram[op2]
			source2 = ram[op3]
			answer = fix16bit(source1 + source2)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case BGE:
			source1 = ram[op2]
			source2 = ram[op3]
			destination = ram[op1]
			increment = false
			if(destination[0] == "."){
				destination = keys[destination]
				increment = true
			}
			answer = (source1 + (((2**16) - 1) - source2) + 1) >= (2**16)
			if(answer){
				ram[PC] = destination
			}
			break
		case NOR:
			source1 = ram[op2]
			source2 = ram[op3]
			answer = logicalNOR(source1, source2)
			ram[op1] = answer
			if (op1 == PC){
				increment = false
			}
			break
		case RSH:
			source1 = ram[op2]
			answer = fix16bit(source1 >> 1)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case MOV:
			ram[op1] = ram[op2]
			break
		case IN:
			ram[op1] = fix16bit(key)
			key = 0
			break
		case OUT:
			source1 = ram[op1]
			source2 = ram[op2]
			source3 = ram[op3]
			setpx(source1,source2,source3)
			break
		case PRI:
			source1 = ram[op1]
			drawChar(charSet()[source1])
			break
		case IMM:
			ram[op1] = op2
			break
		case JMP:
			destination = ram[op1]
			increment = false
			if(destination[0] == "."){
				destination = keys[destination]
				increment = true
			}
			ram[PC] = destination
			break
		case END:
			halt = "YES"
			break
		case SUB:
			source1 = ram[op2]
			source2 = ram[op3]
			answer = fix16bit(source1 - source2)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case NOP:
			break
		case LSH:
			source1 = ram[op2]
			answer = fix16bit(source1 << 1)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case INC:
			source1 = ram[op2]
			answer = fix16bit(source1 + 1)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case DEC:
			source1 = ram[op2]
			answer = fix16bit(source1 - 1)
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case PRR:
			source1 = ram[op1]
			drawChar(source1)
			break
	}
}

function tick(){
	try{on}catch{
		reset()
		on = "YES"
		increment = true
	}
	tick++

	if(tick%2 == 0 && on == "YES"){
		if(increment){
			ram[PC]++
		}
		interpret(ram[PC])
	}
}
