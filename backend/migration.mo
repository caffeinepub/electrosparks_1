import Nat "mo:core/Nat";
import Map "mo:core/Map";

module {
  type OldActor = {
    registrations : Map.Map<Nat, Registration>;
    nextId : Nat;
    sessionTokens : Map.Map<Text, Int>;
  };

  type Registration = {
    id : Nat;
    fullName : Text;
    collegeName : Text;
    department : Text;
    year : Nat;
    email : Text;
    phone : Text;
    eventType : EventType;
    numberOfMembers : Nat;
    totalAmount : Nat;
    paymentScreenshotFileName : Text;
    timestamp : Int;
  };

  type EventType = {
    #workshop;
    #competition;
    #seminar;
  };

  type RegistrationState = {
    entries : Map.Map<Nat, Registration>;
    nextId : Nat;
  };

  public func run(old : OldActor) : { var state : RegistrationState } {
    // Drop sessionTokens and initialize persistent state
    { var state = { entries = old.registrations; nextId = old.nextId } };
  };
};
