import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  // Mixin component state
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type EventType = {
    #workshop;
    #competition;
    #seminar;
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
  };

  let registrations = Map.empty<Nat, Registration>();
  var nextId = 0;

  // Open to anyone (including guests/anonymous) — public registration form
  public shared ({ caller }) func submitRegistration(
    fullName : Text,
    collegeName : Text,
    department : Text,
    year : Nat,
    email : Text,
    phone : Text,
    eventType : EventType,
    numberOfMembers : Nat,
    totalAmount : Nat,
    paymentScreenshotFileName : Text,
  ) : async Nat {
    let id = nextId;
    let registration : Registration = {
      id;
      fullName;
      collegeName;
      department;
      year;
      email;
      phone;
      eventType;
      numberOfMembers;
      totalAmount;
      paymentScreenshotFileName;
    };
    registrations.add(id, registration);
    nextId += 1;
    id;
  };

  // Admin-only: exposes all participant personal data
  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all registrations");
    };
    registrations.values().toArray();
  };
};
