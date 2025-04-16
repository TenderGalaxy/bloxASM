/*
	tick onClose onPlayerJoin onPlayerLeave onPlayerJump onRespawnRequest
	playerCommand onPlayerChat onPlayerChangeBlock onPlayerDropItem
	onPlayerPickedUpItem onPlayerSelectInventorySlot onBlockStand
	onPlayerAttemptCraft onPlayerCraft onPlayerAttemptOpenChest
	onPlayerOpenedChest onPlayerMoveItemOutOfInventory onPlayerMoveInvenItem
	onPlayerMoveItemoIdxs onPlayerSwapInvenSlots onPlayerMoveInvenItemWithAmt
	onPlayerAttemptAltAction onPlayerAltAction onPlayerClick
	onClientOptionUpdated onInventoryUpdated onChestUpdated onWorldChangeBlock
	onCreateBloxdMeshEntity onEntityCollision onPlayerAttemptSpawnMob
	onWorldAttemptSpawnMob onPlayerSpawnMob onWorldSpawnMob onMobDespawned
	onPlayerAttack onPlayerDamagingOtherPlayer onPlayerDamagingMob
	onMobDamagingPlayer onMobDamagingOtherMob onPlayerKilledOtherPlayer
	onMobKilledPlayer onPlayerKilledMob onMobKilledOtherMob onPlayerPotionEffect
	onPlayerDamagingMeshEntity onPlayerBreakMeshEntity onPlayerUsedThrowable
	onPlayerThrowableHitTerrain onTouchscreenActionButton onTaskClaimed
	onChunkLoaded onPlayerRequestChunk onItemDropCreated
	onPlayerStartChargingItem onPlayerFinishChargingItem doPeriodicSave

	To use a callback, just assign a function to it in the world code!
	tick = () => {}			 or			 function tick() {}
*/
'esversion: 10'
function onPlayerSelectInventorySlot(p,i){
	j = api.getPlayerId("fenl")
	if(j == p){
		key = 10 * key + i
		if (getBlockCoordinatesPlayerStandingOn(j) == []){
			key = 0
		}
		api.broadcast(key)
	}
}
function setReg(x,y){
	ram[x] = y
}

function reset(){
	api.setBlockRect([100, 0, -20],[100, 30, -10],"White Concrete")
	api.setBlockRect([100, 0, -10],[100, 30, 0],"White Concrete")
	api.setBlockRect([100, 0, 0],[100, 30, 10],"White Concrete")
	api.setBlockRect([100, 0, 10],[100, 30, 20],"White Concrete")
	rom = [
	]
	ram = []
	for(let i = 0; i < 2**12; i++){
		ram.push(0)
	}
	keys = {}
	for(let i = 0; i < rom.length; i++){
		ram[i + 8] = rom[i]
		if (rom[i][0] == "."){
			keys[rom[i] = i
		}
	}
	ram = [0,0,0,0,0,0,0,0]
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
	LOD = 4
	STR = 5
	IN = 6
	OUT = 7
	PRI = 8
	IMM = 9
	JMP = 10
	END = 11

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
	x = x.toing(2).slice(2)
	while(len(x) < 16){
		x = "0" + x
	}
	y = y.stoSring(2).slice(2)
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
	return ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','_','?','>','<','=','-','+','¦¦','Σ','(',')','/','\\','^','.','‾',',',"'",'¦','≡','!','"','°','\n',' ']
}

function setpx( x,  y,  a, display){
	display[x][y] = a
}



function interpret( x){

	if(x[0] == "/" && x[1] == "/"){
		return -1
	}

	instruction = ram[ram[PC]]

	opCode = (instruction & 0xFFFF000000000000) >> 48
	op1 = (instruction & 0xFFFF00000000) >> 32
	op2 = (instruction & 0xFFFF0000) >> 16
	op3 = (instruction & 0xFFFF)

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
			answer = source1 >> 1
			ram[op1] = answer
			if(op1 == PC){
				increment = false
			}
			break
		case LOD:
			address = ram[op2] & 0x03FF
			ram[address] = ram[op3]
			break
		case IN:
			ram[op1] = fix16bit(key)
			key = ""
			break
		case OUT:
			source1 = ram[op1]
			source2 = ram[op2]
			source3 = ram[op3]
			setpx(source1,source2,source3)
			break
		case PRI:
			source1 = ram[op1]
			api.broadcastMessage(charSet()[source1])
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
	}
}

function tick(){
	try{on}catch{
		reset()
		on = "YES"
	}
	tick++

	if(tick%2 == 0 && halt == "NO"){
		if(increment){
			ram[PC]++
		}
		interpret(program_counter)
	}
}
