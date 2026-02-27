import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func getCurrentTime() : Int {
    Time.now();
  };

  public type UserProfile = {
    name : Text;
  };

  var userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public type EventType = {
    #workshop;
    #competition;
    #seminar;
  };

  public type Registration = {
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

  public type RegistrationState = {
    entries : Map.Map<Nat, Registration>;
    nextId : Nat;
  };

  var state : RegistrationState = {
    entries = Map.empty<Nat, Registration>();
    nextId = 0;
  };

  public type RegistrationResult = {
    #success : Nat;
    #notFound;
  };

  // Public registration form
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
      timestamp = getCurrentTime();
    };
    state.entries.add(id, registration);
    state := { state with nextId = id + 1 };
    id;
  };

  // Open to everyone: view all registrations
  public query ({ caller }) func getOpenRegistrations() : async [Registration] {
    let entries = state.entries.values().toArray();
    entries.sort(
      func(a, b) {
        Int.compare(b.timestamp, a.timestamp);
      }
    );
  };

  // Admins only: view a specific registration
  public query ({ caller }) func getRegistration(id : Nat) : async ?Registration {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view a specific registration.");
    };
    state.entries.get(id);
  };

  public type Stats = {
    totalRegistrations : Nat;
    totalMembers : Nat;
    totalRevenue : Nat;
  };

  // Admins only: fetch aggregate stats
  public query ({ caller }) func getStats() : async Stats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can fetch stats.");
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

  // Admin: get all registrations filtered by event type
  public query ({ caller }) func getRegistrationsByEventType(eventType : EventType) : async [Registration] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can filter by event type");
    };
    let filtered = state.entries.values().toArray();
    filtered.filter(func(reg) { reg.eventType == eventType });
  };

  // Admin: get statistics for a specific event type
  public query ({ caller }) func getStatsByEventType(eventType : EventType) : async Stats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can get event type stats");
    };

    let filtered = state.entries.values().toArray();
    let filteredEntries = filtered.filter(func(reg) { reg.eventType == eventType });
    let totalRegistrations = filteredEntries.size();

    var totalMembers = 0;
    var totalRevenue = 0;
    for (reg in filteredEntries.values()) {
      totalMembers += reg.numberOfMembers;
      totalRevenue += reg.totalAmount;
    };

    {
      totalRegistrations;
      totalMembers;
      totalRevenue;
    };
  };

  // Admin-only delete registration (persistent removal)
  public shared ({ caller }) func deleteRegistration(id : Nat) : async RegistrationResult {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can permanently delete registrations");
    };
    switch (state.entries.get(id)) {
      case (null) {
        #notFound;
      };
      case (?_) {
        state.entries.remove(id);
        #success(id);
      };
    };
  };
};
