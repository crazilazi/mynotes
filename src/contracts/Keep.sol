pragma solidity >=0.4.22 <0.6.0;

contract Keep {
    string public app;
    uint public notesCount = 0;
    mapping(uint => Note) public Notes;

    struct Note {
    uint id;
    string title;
    string content;
    uint createdOn;
    address payable user;
    }

     event NoteSaved(
        uint id,
        string title,
        string content,
        uint createdOn,
        address payable user
    );

     constructor() public {
        app = "Keep";
    }

    function saveNote(string memory _content, string memory _title, uint  _createdOn) public {
        // Require a valid content
        require(bytes(_content).length > 0);
         // Require a valid content
        require(bytes(_title).length > 0);
        // Increment notes count
        notesCount ++;
        // Create the note
        Notes[notesCount] = Note(notesCount, _title, _content, _createdOn, msg.sender);
        // Trigger an event
        emit NoteSaved(notesCount, _title, _content, _createdOn, msg.sender);
    }

}