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
onplayerSelectInventorySlot = (p,i) => {
	j = api.getplayerId("fenl")
	if(j == p){
		key = 10 * key + i
		if (getblockCoordinatesplayerStandingOn(j) == []){
			key = 0
		}
		api.broadcastMessage(key)
	}
}
function setReg(x,y){
	ram[x] = y
}

function reset(){
	key = 0
	rom = [
'// FIBONACCI',
'0x0008000100000000', //IMM R1 0
'0x0008000200010000', //IMM R2 1
'0x0008000300050000', //IMM R3 6
'0x0008000400100000', //IMM R4 16
'0x00080005003B0000', //IMM R5 '\n'
'0x0000000100010002', //ADD R1 R1 R2
'0x0000000200010002', // ADD R2 R1 R2
'0x0010000100000000', // PRR R1 R0 R0
'0x0007000500000000', // PRI R5 R0 R0
'0x0010000200000000', // PRR R2 R0 R0
'0x0007000500000000', // PRI R5 R0 R0
'0x000F000400040000', // DEC R4 R4 R0
'0x0001000300040003', // BGE R3 R4 R3
'0x000A000000000000' // END
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
	lastDisplay = []
	let tmp = []
	for(let i = 0; i < 30; i++){
		tmp.push(0)
	}
	for(let i = 0; i < 40; i++){
		display.push(tmp)
		lastDisplay.push(tmp)
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
				destination =keys[destination]
				increment = true
			}
			if(source1 >= source2){
				ram[PC] = destination
			} else {
			    increment = true
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
			on = "NO"
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

function display(){
	api.setOptimizations(false)
	for(let i = 0; i < display.length; i++){
		for(let x = 0; x < display[0].length; x++){
			block = api.getBlockId(display[i][x])
			if( block != lastDisplay[i][x]){
				api.setBlock(100,30-i, x - 20,block)
			}
			lastDisplay[i][x] = block
		}
	}
	api.setOptimizations(true)
}

function display(){
	api.setOptimizations(false)
	for(let i = 0; i < display.length; i++){
		for(let x = 0; x < display[0].length; x++){
			block = api.getBlockId(display[i][x])
			if( block != lastDisplay[i][x]){
				api.setBlock(100,30-i, x - 20,block)
			}
			lastDisplay[i][x] = block
		}
	}
	api.setOptimizations(true)
}

tick = () => {
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
		interpret(ram[PC] + 8)
	}
	if(tick%10 == 0 && on == "YES"){
		display()
	}
}

