defmodule GroundStation.BlackBoxChannel do
  use Phoenix.Channel

  def join("black_box:brain", _message, socket) do
    {:ok, socket}
  end


  def join("black_box:pid_controllers", _message, socket) do
    {:ok, socket}
  end

  def join("black_box:interpreter", _message, socket) do
    {:ok, socket}
  end

  def join("black_box:mixer", _message, socket) do
    {:ok, socket}
  end
end
