defmodule BlackBoxConsumer do
  use GenServer
  use AMQP

  def start_link do
    GenServer.start_link(__MODULE__, [], [])
  end

  def init(_opts) do
    :timer.sleep(2000)
    {:ok, channel} = connect_to_rabbitmq
    {:ok, channel}
  end

  # Confirmation sent by the broker after registering this process as a consumer
  def handle_info({:basic_consume_ok, %{consumer_tag: consumer_tag}}, channel) do
    {:noreply, channel}
  end

  # Sent by the broker when the consumer is unexpectedly cancelled (such as after a queue deletion)
  def handle_info({:basic_cancel, %{consumer_tag: consumer_tag}}, channel) do
    {:stop, :normal, channel}
  end

  # Confirmation sent by the broker to the consumer process after a Basic.cancel
  def handle_info({:basic_cancel_ok, %{consumer_tag: consumer_tag}}, channel) do
    {:noreply, channel}
  end

  def handle_info({:basic_deliver, payload, %{delivery_tag: tag, routing_key: routing_key, redelivered: redelivered}}, channel) do
    spawn fn -> consume(channel, tag, redelivered, routing_key, payload) end
    {:noreply, channel}
  end

  defp consume(channel, tag, redelivered, routing_key, json_payload) do
    payload = Poison.decode!(json_payload)
    if routing_key == "pid_controllers" do
      :ok = GroundStation.Endpoint.broadcast! "black_box:#{routing_key}", payload["name"] <> "_data", payload
    else
      :ok = GroundStation.Endpoint.broadcast! "black_box:#{routing_key}", "data", payload
    end
    Basic.ack channel, tag
  end

  defp connect_to_rabbitmq() do
    {:ok, connection} = Connection.open("amqp://ground_station:ground_station@localhost:5672")
    {:ok, channel}    = Channel.open(connection)
    Exchange.topic(channel, "black_box_events", durable: true)
    Queue.declare(channel, "ground_station", durable: true)
    Queue.bind(channel, "ground_station", "black_box_events", routing_key: "*")
    {:ok, _consumer_tag} = Basic.consume(channel, "ground_station")
    {:ok, channel}
  end
end
