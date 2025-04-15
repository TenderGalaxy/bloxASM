/*
	tick onClose onPlayerJoin onPlayerLeave onPlayerJump onRespawnRequest
	playerCommand onPlayerChat onPlayerChangeBlock onPlayerDropItem
	onPlayerPickedUpItem onPlayerSelectInventorySlot onBlockStand
	onPlayerAttemptCraft onPlayerCraft onPlayerAttemptOpenChest
	onPlayerOpenedChest onPlayerMoveItemOutOfInventory onPlayerMoveInvenItem
	onPlayerMoveItemIntoIdxs onPlayerSwapInvenSlots onPlayerMoveInvenItemWithAmt
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
function onPlayerSelectInventorySlot(i){
key = i
}


function reset(){
api.setBlockRect([100, 0, -20],[100, 30, -10],"White Concrete")
api.setBlockRect([100, 0, -10],[100, 30, 0],"White Concrete")
api.setBlockRect([100, 0, 0],[100, 30, 10],"White Concrete")
api.setBlockRect([100, 0, 10],[100, 30, 20],"White Concrete")
key = 0
tick = 0
rom = [
"0001",
"
]
}

function tick(){
try{on}catch{
reset()
on = "YES"
}
tick++

/* INTERPRETER */




}
