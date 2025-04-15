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


function reset(){
	api.setBlockRect([100, 0, -20],[100, 30, -10],"White Concrete")
	api.setBlockRect([100, 0, -10],[100, 30, 0],"White Concrete")
	api.setBlockRect([100, 0, 0],[100, 30, 10],"White Concrete")
	api.setBlockRect([100, 0, 10],[100, 30, 20],"White Concrete")
	key = 0
	program_counter = 0
	rom = [
	]
	ram = []
	for(let i = 0; i < 2**12; i++){
		ram.push(0)
	}
	for(let i = 0; i < rom.length; i++){
		ram[i] = rom[i]
	}
	registers = [0,0,0,0,0,0,0,0]
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

	registers = [0,0,0,0,0,0,0,0]

	R0 = 0
	R1 = 1
	R2 = 2
	R3 = 3
	R4 = 4
	R5 = 5
	SP = 6
	PC = 7
	
	errorCount = 0
	registers[SP] = (2**12)-1

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

	instruction = ram[registers[PC]]

	opCode = (instruction & 0x0E00) >> 9
	op1 = (instruction & 0x01C0) >> 6
	op2 = (instruction & 0x0038) >> 3
	op3 = (instruction & 0x0007)

	dontIncrement = false

	switch (opCode){
		case ADD:
			source1 = registers[op2]
			source2 = registers[op3]
			answer = fix16bit(source1 + source2)
			registers[op1] = answer
			if(op1 == PC){
				dontIncrement = true
			}
			break
		case BGE:
			source1 = registers[op2]
			source2 = registers[op3]
			destination = registers[op1]
			answer = (source1 + (((2**16) - 1) - source2) + 1) >= (2**16)
			if(answer){
				registers[PC] = destination
				dontIncrement = true
			}
			break
		case NOR:
			source1 = registers[op2]
			source2 = registers[op3]
			answer = logicalNOR(source1, source2)
			registers[op1] = answer
			if (op1 == PC){
				dontIncrement = true
			}
			break
		case RSH:
			source1 = registers[op2]
			answer = source1 >> 1
			registers[op1] = answer
			if(op1 == PC){
				dontIncrement = true
			}
			break
		case LOD:
			address = registers[op2] & 0x03FF
			ram[address] = registers[op3]
			break
		case IN:
			registers[op1] = fix16bit(key)
			key = ""
			break
		case OUT:
			source1 = registers[op1]
			source2 = registers[op2]
			source3 = registers[op3]
			setpx(source1,source2,source3)
			break
	}
}

function tick(){
	try{on}catch{
		reset()
		on = "YES"
	}
	tick++

	if(tick%2 == 0){
		regs[PC] = tick/2
		interpret(program_counter)
	}
}
