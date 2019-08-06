CREATE TABLE teams (
  id bigserial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE members (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text,
  phone text,
  team bigint REFERENCES teams NOT NULL
);

CREATE TABLE events (
  id bigserial PRIMARY KEY,
  name text,
  date timestamp with time zone NOT NULL DEFAULT NOW(),
  team bigint REFERENCES teams NOT NULL
);

CREATE TABLE invites (
  id bigserial PRIMARY KEY,
  reply boolean,
  event bigint REFERENCES events NOT NULL,
  member bigint REFERENCES members NOT NULL
);

CREATE TABLE owners (
  team bigint REFERENCES teams NOT NULL,
  owner integer NOT NULL
);

CREATE UNIQUE INDEX team_member ON members (email, team);
CREATE UNIQUE INDEX member_invites ON invites (event, member);
