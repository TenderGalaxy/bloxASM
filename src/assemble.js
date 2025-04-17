rom = [
  "IMM 1 0"
]


function functions(){
  funs = {
    "ADD" : "0000",
    "BGE" : "0001",
    "NOR" : "0002",
    "RSH" : "0003",
    "MOV" : "0004",
    "IN"  : "0005",
    "OUT" : "0006",
    "PRI" : "0007",
    "IMM" : "0008",
    "JMP" : "0009",
    "END" : "000A",
    "SUB" : "000B",
    "NOP" : "000C",
    "LSH" : "000D",
    "INC" : "000E",
    "DEC" : "000F",
    "PRR" : "0010"
  }
}
function lengthen(x){
  while(x.length < 4){
    x = "0" + x
  } return x
}
function compile(line){
  line = line.split()
  while(line.length < 4){
    line.push(0)
  }
  otp = "0x" + funs[line]
  otp += lengthen(line[1].toString(16))
  otp += lengthen(line[2].toString(16))
  otp += lengthen(line[3].toString(16))
  return otp
}

function fullcompile(){
  otp = "["
  for (let i = 0; i < rom.length - 1; i++){
    otp += '"' + compile(rom[i]) + '",'
  }
  otp += '"' + compile[rom[rom.length-1]] + '"]"
  return otp
}

console.log(fullcompile())


