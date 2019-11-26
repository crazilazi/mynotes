pragma solidity >=0.4.22 <0.6.0;

contract Diary {
    string public name;
    uint public notesCount;
    mapping(uint => Note) public Notes;
    struct Note {
    uint id;
    uint price;
    string content;
    address payable user;
    }
     event NotesCreated(
        uint id,
        string content,
        uint price,
        address payable user
    );
     constructor() public {
        name = "Dapps Notes";
    }
    function createNote(string memory _content, uint _price) public {
        // Require a valid name
        require(bytes(_content).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment notes count
        notesCount ++;
        // Create the note
        Notes[notesCount] = Note(notesCount, _price, _content, msg.sender);
        // Trigger an event
        emit NotesCreated(notesCount, _content, _price, msg.sender);
    }
}