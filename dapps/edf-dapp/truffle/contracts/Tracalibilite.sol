// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

/**
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Tracabilite {
    //attributs
    struct Common {
        string didFrom;
        string didTo;
        string dateTime;
    }
    struct Specifications {
        string item;
        string[] materials;
        string[] informations;
        string[] tests;
    }

    struct ListItems {
        string item;
        uint256 quantity;
    }
    struct TransactionClientFournisseur {
        Common transactionDonnees;
        Specifications[] specifications;
    }
    //t1
    TransactionClientFournisseur transactionClientFournisseur;

    struct TransactionFournisseurClient {
        Common transactionDonnees;
        bool feedback;
    }
    //t2
    TransactionFournisseurClient transactionFournisseurClient;
    //t3
    struct TransactionFournisseurLabo {
        Common transactionDonnees;
        Specifications[] specifications;
    }
    TransactionFournisseurLabo transactionFournisseurLabo;
    //t4
    struct TransactionLaboFournisseur {
        Common transactionDonnees;
        bool feedback;
    }
    //t5
    TransactionLaboFournisseur transactionLaboFournisseur;
    struct TransactionLaboFournisseur2 {
        Common transactionDonnees;
        bool testsValidated;
    }
    TransactionLaboFournisseur2 transactionLaboFournisseur2;
    //t6
    struct TransactionLaboClient {
        Common transactionDonnees;
        uint256 idPvd;
    }
    TransactionLaboClient transactionLaboClient;

    struct TransactionFournisseurClientLast {
        Common transactionDonnees;
        ListItems[] listItems;
    }
    TransactionFournisseurClientLast transactionFournisseurClientLast;

    //T1 : transaction client vers fournisseur
    function getTransactionFournisseurClient()
        public
        view
        returns (TransactionClientFournisseur memory)
    {
        return transactionClientFournisseur;
    }

    function setTransactionClientFournisseur(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        Specifications[] memory _specifications
    ) public {
        transactionClientFournisseur.transactionDonnees.didFrom = _didFrom;
        transactionClientFournisseur.transactionDonnees.didTo = _didTo;
        transactionClientFournisseur.transactionDonnees.dateTime = _dateTime;
        for (uint256 _y = 0; _y < _specifications.length; _y++) {
            transactionClientFournisseur.specifications.push(
                _specifications[_y]
            );
        }
    }

    //T2 : transaction fournisseur vers client
    function geTtransactionFournisseurClient()
        public
        view
        returns (TransactionFournisseurClient memory)
    {
        return transactionFournisseurClient;
    }

    function seTtransactionFournisseurClient(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        bool _feedback
    ) public {
        transactionFournisseurClient.transactionDonnees.didFrom = _didFrom;
        transactionFournisseurClient.transactionDonnees.didTo = _didTo;
        transactionFournisseurClient.transactionDonnees.dateTime = _dateTime;
        transactionFournisseurClient.feedback = _feedback;
    }

    //T3 :transaction fournisseur vers labo
    function getTransactionFournisseurLabo()
        public
        view
        returns (TransactionFournisseurLabo memory)
    {
        return transactionFournisseurLabo;
    }

    function setTransactionFournisseurLabo(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        Specifications[] memory _specifications
    ) public {
        transactionFournisseurLabo.transactionDonnees.didFrom = _didFrom;
        transactionFournisseurLabo.transactionDonnees.didTo = _didTo;
        transactionFournisseurLabo.transactionDonnees.dateTime = _dateTime;
        for (uint256 _y = 0; _y < _specifications.length; _y++) {
            transactionFournisseurLabo.specifications.push(_specifications[_y]);
        }
    }

    //T4 : transaction Labo vers Fournisseur
    function getTransactionLaboFournisseur()
        public
        view
        returns (TransactionLaboFournisseur memory)
    {
        return transactionLaboFournisseur;
    }

    function setTransactionLaboFournisseur(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        bool _feedback
    ) public {
        transactionLaboFournisseur.transactionDonnees.didFrom = _didFrom;
        transactionLaboFournisseur.transactionDonnees.didTo = _didTo;
        transactionLaboFournisseur.transactionDonnees.dateTime = _dateTime;
        transactionLaboFournisseur.feedback = _feedback;
    }

    //T5 : transaction Labo vers Fournisseur 2
    function getTransactionLaboFournisseur2()
        public
        view
        returns (TransactionLaboFournisseur2 memory)
    {
        return transactionLaboFournisseur2;
    }

    function setTransactionLaboFournisseur2(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        bool _testValidated
    ) public {
        transactionLaboFournisseur2.transactionDonnees.didFrom = _didFrom;
        transactionLaboFournisseur2.transactionDonnees.didTo = _didTo;
        transactionLaboFournisseur2.transactionDonnees.dateTime = _dateTime;
        transactionLaboFournisseur2.testsValidated = _testValidated;
    }

    //T6 : transaction Labo vers client
    function getTransactionLaboClient()
        public
        view
        returns (TransactionLaboClient memory)
    {
        return transactionLaboClient;
    }

    function setTransactionLaboClient(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        uint256 _idPvd
    ) public {
        transactionLaboClient.transactionDonnees.didFrom = _didFrom;
        transactionLaboClient.transactionDonnees.didTo = _didTo;
        transactionLaboClient.transactionDonnees.dateTime = _dateTime;
        transactionLaboClient.idPvd = _idPvd;
    }

    //T7 : transaction finale fournisseur vers client
    function getTransactionFournisseurClientLast()
        public
        view
        returns (TransactionFournisseurClientLast memory)
    {
        return transactionFournisseurClientLast;
    }

    function setTransactionFournisseurClientLast(
        string memory _didFrom,
        string memory _didTo,
        string memory _dateTime,
        ListItems[] memory _listItems
    ) public {
        transactionFournisseurClientLast.transactionDonnees.didFrom = _didFrom;
        transactionFournisseurClientLast.transactionDonnees.didTo = _didTo;
        transactionFournisseurClientLast
            .transactionDonnees
            .dateTime = _dateTime;
        for (uint256 _y = 0; _y < _listItems.length; _y++) {
            transactionFournisseurClientLast.listItems.push(_listItems[_y]);
        }
    }
}
