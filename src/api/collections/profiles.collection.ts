import { MongoObservable } from "meteor-rxjs";
import { Profile } from "../models/profile.model";

export const Profiles = new MongoObservable.Collection<Profile>('profiles');

Profiles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
