//SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ByteHasher } from './helpers/ByteHasher.sol';
import { IWorldID } from './interfaces/IWorldID.sol';

contract PetFund is ERC721URIStorage {
  using Counters for Counters.Counter;
  using ByteHasher for bytes;
  Counters.Counter private _totalCharities;
  Counters.Counter private _totalDonation;
  Counters.Counter public _totalNFTs;

  uint256 public charityTax;
  /// @notice Thrown when attempting to reuse a nullifier
  error InvalidNullifier();

  /// @dev The WorldID instance that will be used for verifying proofs
  IWorldID internal immutable worldId = '0xABB70f7F39035586Da57B3c8136035f87AC0d2Aa';
  /// @dev Whether a nullifier hash has been used already. Used to prevent double-signaling
  mapping(uint256 => bool) internal nullifierHashes;

  mapping(uint256 => CharityStruct) charities;
  mapping(uint256 => bool) public charityExist;

  struct CharityStruct {
    string cid;
    uint256 id;
    address owner;
    uint256 amount;
    uint256 donations;
  }

  constructor(uint256 _charityTax) ERC721('Community Pets', 'CP') {
    charityTax = _charityTax;
  }

  function createCharity(
    string memory _cid,
    uint256 amount,
    address input,
    uint256 root,
    uint256 nullifierHash,
    uint256[8] calldata proof
  ) public {
    require(amount > 0 ether, 'Amount cannot be zero');

    if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

    worldId.verifyProof(
      root,
      abi.encodePacked(input).hashToField(),
      nullifierHash,
      abi.encodePacked(address(this)).hashToField(),
      proof
    );
    // finally, we record they've done this, so they can't do it again (proof of uniqueness)
    nullifierHashes[nullifierHash] = true;

    _totalCharities.increment();
    CharityStruct memory charity;
    charity.id = _totalCharities;
    charity.owner = msg.sender;
    charity.cid = _cid;
    charity.amount = amount;

    charities[charity.id] = charity;
  }

  function donate(uint256 id) public payable {
    require(charityExist[id], 'Charity Not Found');
    require(msg.value > 0 ether, 'Donation cannot be zero');

    _totalDonation.increment();

    charities[id].donations += msg.value;

    uint256 fee = (msg.value * charityTax) / 100;
    uint256 payment = msg.value - fee;

    payTo(charities[id].owner, payment);
    payTo(owner, fee);
  }

  function getCharity(uint256 id) public view returns (CharityStruct memory) {
    return charities[id];
  }

  function getCharities() public view returns (CharityStruct[] memory Charities) {
    uint256 available;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted && !charities[i].banned && charities[i].raised < charities[i].amount
      ) {
        available++;
      }
    }

    Charities = new CharityStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted && !charities[i].banned && charities[i].raised < charities[i].amount
      ) {
        Charities[index++] = charities[i];
      }
    }
  }

  function getMyCharities() public view returns (CharityStruct[] memory Charities) {
    uint256 available;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted &&
        charities[i].raised < charities[i].amount &&
        charities[i].owner == msg.sender
      ) {
        available++;
      }
    }

    Charities = new CharityStruct[](available);

    uint256 index;
    for (uint i = 1; i <= _totalCharities.current(); i++) {
      if (
        !charities[i].deleted &&
        charities[i].raised < charities[i].amount &&
        charities[i].owner == msg.sender
      ) {
        Charities[index++] = charities[i];
      }
    }
  }

  function getSupports(uint256 id) public view returns (SupportStruct[] memory) {
    return supportersOf[id];
  }

  function payTo(address to, uint256 amount) internal {
    (bool success, ) = payable(to).call{ value: amount }('');
    require(success);
  }

  function currentTime() internal view returns (uint256) {
    return (block.timestamp * 1000) + 1000;
  }
}
