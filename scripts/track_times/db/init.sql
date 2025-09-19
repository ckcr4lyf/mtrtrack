CREATE TABLE IF NOT EXISTS train_times (
  route TEXT NOT NULL,
  time TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_train_times_route ON train_times (route);
CREATE INDEX IF NOT EXISTS idx_train_times_time ON train_times (time);