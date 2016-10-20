ExUnit.start

Mix.Task.run "ecto.create", ~w(-r GroundStation.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r GroundStation.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(GroundStation.Repo)

