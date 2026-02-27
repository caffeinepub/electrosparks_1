import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Int "mo:core/Int";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Use migration component for continuous data persistence
(with migration = Migration.run)
actor {
  // Mixin component state
  let accessControlState = AccessControl.initState();

  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type UserProfile = {
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
    timestamp : Int;
  };

  type RegistrationState = {
    entries : Map.Map<Nat, Registration>;
    nextId : Nat;
  };

  // Core state containing registration data
  var state : RegistrationState = {
    entries = Map.empty<Nat, Registration>();
    nextId = 0;
  };

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
    let id = state.nextId;
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
      timestamp = Time.now();
    };
    state.entries.add(id, registration);
    state := { state with nextId = id + 1 };
    id;
  };

  // Admin-only queries for aggregate stats
  type Stats = {
    totalRegistrations : Nat;
    totalMembers : Nat;
    totalRevenue : Nat;
  };

  public query ({ caller }) func getStats() : async Stats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };
    let allEntries = state.entries.values().toArray();
    let totalRegistrations = allEntries.size();

    var totalMembers = 0;
    var totalRevenue = 0;
    for (reg in allEntries.values()) {
      totalMembers += reg.numberOfMembers;
      totalRevenue += reg.totalAmount;
    };

    {
      totalRegistrations;
      totalMembers;
      totalRevenue;
    };
  };

  // Admin-only query to fetch all registrations sorted by timestamp with most recent first
  public query ({ caller }) func getAllRegistrations() : async [Registration] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all registrations");
    };
    let entries = state.entries.values().toArray();
    entries.sort(
      func(a, b) {
        Int.compare(b.timestamp, a.timestamp);
      }
    );
  };

  // Admin-only query to fetch single registration by id
  public query ({ caller }) func getRegistration(id : Nat) : async ?Registration {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view registration details");
    };
    state.entries.get(id);
  };
};
