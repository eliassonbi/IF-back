pragma solidity ^0.8.10;

contract ContractIF {
  uint public count = 0;

  mapping(address => uint ) public kwatt;
  mapping(address => uint ) public co2;

  event Confirmation(address indexed _seller, address indexed _buyer, uint _valueCo2, uint _valueKwatt, uint _valueEuro);
   function confirmation(address _seller, address _buyer, uint _valueCo2, uint _valueKwatt, uint _valueEuro) public {      
      emit Confirmation( _seller, _buyer, _valueCo2, _valueKwatt, _valueEuro);
   }

     function getSender() public view
            returns (address)
    {
        return msg.sender;
    }

    function setKwatt(address add, uint value) public {
        kwatt[add] = value;
    }

    function setCo2(address add, uint value) public {
        co2[add] = value;
    }

    function getCo2(address add) public view returns (uint){
        return co2[add];
    }

    function getKwatt(address add) public view returns (uint){
        return kwatt[add];
    }

    function sendEthForKwatt(address add1, address add2, uint value ) public {
        kwatt[add2] += value*19;
        co2[add1] += 1;
    }

}