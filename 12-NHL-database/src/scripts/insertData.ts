require('dotenv').config();
import pool from '../services/database.service';
// Insert data into 'team' table
const insertTeams = `
  INSERT INTO team (name, city, coach)
  VALUES 
  ('Lions FC', 'New York', 'John Smith'),
  ('Tigers FC', 'Los Angeles', 'Jane Doe')
`;

// Insert data into 'player' table
const insertPlayers = `
  INSERT INTO player (name, position, skill_level, injury_records, team_id)
  VALUES 
  ('John Doe', 'Forward', 8, ARRAY['Knee Injury', 'Hamstring Tear'], 1), 
  ('Sarah Brown', 'Midfielder', 7, ARRAY['Ankle Sprain'], 1), 
  ('Mike Green', 'Defender', 9, ARRAY['Shoulder Dislocation'], 2)
`;

// Update captain for 'Lions FC'
const updateCaptain = `
  UPDATE team 
  SET captain_id = 1 -- John Doe's player ID
  WHERE id = 1
`;

// Insert data into 'game' table
const insertGames = `
  INSERT INTO game (host_team_id, guest_team_id, game_date, score)
  VALUES 
  (1, 2, '2024-10-25', '3-2'), 
  (2, 1, '2024-11-01', '1-1')
`;

// Function to run queries sequentially
const runInserts = async () => {
  const client = await pool.connect();
  try {
    // Insert teams
    await client.query(insertTeams);
    console.log('Teams inserted successfully');

    // Insert players
    await client.query(insertPlayers);
    console.log('Players inserted successfully');

    // Update captain
    await client.query(updateCaptain);
    console.log('Captain updated successfully');

    // Insert games
    await client.query(insertGames);
    console.log('Games inserted successfully');
  } catch (err) {
    console.error('Error running queries', err);
  } finally {
    client.release();
  }
};

// Execute the queries
runInserts();