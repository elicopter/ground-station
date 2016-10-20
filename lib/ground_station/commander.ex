defmodule Commander do
  use GenServer
  use AMQP
  require Logger
  require Poison

  @amqp_exchange "commands"

  def init(_) do
    {:ok, channel} = connect()
    {:ok, %{channel: channel}}
  end

  def start_link(name) do
    Logger.debug "Starting #{__MODULE__}..."
    GenServer.start_link(__MODULE__, nil, name: name)
  end

  def handle_info({:DOWN, _, :process, _pid, _reason}, state) do
    {:ok, channel} = connect()
    {:noreply, %{state | channel: channel}}
  end

  def handle_cast({:send_command, process_name, command, options}, state) do
    :ok = AMQP.Basic.publish(state[:channel], @amqp_exchange, "command", Poison.encode!(%{
      process_name: process_name,
      command: command,
      options: options
    }))
    {:noreply, state}
  end

  def send_command(process_name, command, options) do
    GenServer.cast(:commander, {:send_command, process_name, command, options})
  end

  defp connect do
    case Connection.open("amqp://ground_station:ground_station@localhost") do
      {:ok, connection} ->
        # Get notifications when the connection goes down
        Process.monitor(connection.pid)
        {:ok, channel} = Channel.open(connection)
        :ok            = AMQP.Exchange.declare(channel, @amqp_exchange, :topic, durable: true)
        # :timer.send_interval(10, :flush)
        {:ok, channel}
      {:error, error} ->
        IO.inspect error
        IO.puts "Wait and reconnect"
        :timer.sleep(1000)
        connect()
    end
  end
end
