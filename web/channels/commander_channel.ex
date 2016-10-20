defmodule GroundStation.CommanderChannel do
  use Phoenix.Channel
  require Commander
  def join("commander:commands", _message, socket) do
    {:ok, socket}
  end

  def handle_in("tune", options, socket) do
    Commander.send_command(options["pid_controller"], "tune", Map.drop(options, ["pid_controller"]))
    {:noreply, socket}
  end

  def handle_in("reset", options, socket) do
    Commander.send_command(options["pid_controller"], "reset", %{})
    {:noreply, socket}
  end
end
