import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Message = {
    id : Nat;
    author : Principal;
    content : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Nat.compare(message1.id, message2.id);
    };
  };

  let messages = Map.empty<Nat, Message>();

  var nextMessageId = 0;

  public shared ({ caller }) func addMessage(content : Text) : async () {
    switch (content.size()) {
      case (0) { Runtime.trap("Message cannot be empty. ") };
      case (_) {
        let message : Message = {
          id = nextMessageId;
          author = caller;
          content;
          timestamp = Time.now();
        };
        messages.add(nextMessageId, message);
        nextMessageId += 1;
      };
    };
  };

  public query ({ caller }) func getMessage(id : Nat) : async Message {
    switch (messages.get(id)) {
      case (null) { Runtime.trap("Message not found. ") };
      case (?message) { message };
    };
  };

  public query ({ caller }) func getAllMessages() : async [Message] {
    messages.values().toArray().sort();
  };
};
