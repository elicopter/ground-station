defmodule GroundStation.SensorsChannel do
  use Phoenix.Channel

  def join("sensors:gyroscope", _message, socket) do
    {:ok, socket}
  end

  def join("sensors:accelerometer", _message, socket) do
    {:ok, socket}
  end

  def join("sensors:barometer", _message, socket) do
    {:ok, socket}
  end

  def handle_out(event, payload, socket) do
    IO.puts "EVENT"
    push socket, event, payload
    {:noreply, socket}
  end
end
