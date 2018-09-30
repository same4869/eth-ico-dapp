pragma solidity ^0.4.15;

contract MyCar {
    string public brand;

    constructor(string initbrand) public {
        brand = initbrand;
    }

    function setBrand(string newbrand) public{
        brand = newbrand;
    }
}