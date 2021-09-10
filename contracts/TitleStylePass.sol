// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2021 adrianleb

pragma solidity ^0.8.0;

interface TitlesInterface {
    function verifyTitle(uint256 _titleId, address _account)
        external
        view
        returns (bool);
}

interface BlockStyleInterface {
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract TitleStylePass {
    mapping(uint256 => mapping(uint256 => uint256)) public styleToTitleSupply;
    mapping(uint256 => mapping(uint256 => uint256))
        public styleToTitleSupplyUsed;

    address public titlesAddr;
    address public stylesAddr;
    address public controllerAddr;

    event SupplyUpdated(
        uint256 indexed style,
        uint256 indexed title,
        uint256 supply
    );

    event SupplyUsed(
        address indexed who,
        uint256 indexed style,
        uint256 indexed title
    );

    constructor(
        address _titlesAddr,
        address _stylesAddr,
        address _controllerAddr
    ) {
        titlesAddr = _titlesAddr;
        stylesAddr = _stylesAddr;
        controllerAddr = _controllerAddr;
    }

    /// @dev check if sender owns blockstyle token
    modifier onlyStyleOwner(uint256 style) {
        BlockStyleInterface _styles = BlockStyleInterface(stylesAddr);
        require(msg.sender == _styles.ownerOf(style), "Sender not style owner");
        _;
    }

    function titleSupplyAvailable(uint256 style, uint256 title)
        public
        view
        returns (bool)
    {
        require(
            styleToTitleSupply[style][title] > 0,
            "Title has no supply available for Style"
        );
        return
            styleToTitleSupplyUsed[style][title] <
            styleToTitleSupply[style][title];
    }

    function canMintStyleWithTitle(
        address who,
        uint256 style,
        uint256 title
    ) public view returns (bool) {
        TitlesInterface titlesContract = TitlesInterface(titlesAddr);

        require(
            titlesContract.verifyTitle(title, who),
            "Wallet not title eligible"
        );
        require(
            titleSupplyAvailable(style, title),
            "No supply available for title"
        );

        return true;
    }

    function updateTitleStyleSupply(
        uint256 style,
        uint256 title,
        uint256 supply
    ) external onlyStyleOwner(style) {
        styleToTitleSupplyUsed[style][title] = supply;
    }

    function incrementTitleStyleSupplyUsed(uint256 style, uint256 title)
        external
        returns (uint256)
    {
        require(msg.sender == controllerAddr, "Caller not controller");
        styleToTitleSupplyUsed[style][title] += 1;

        return styleToTitleSupplyUsed[style][title];
    }
}
