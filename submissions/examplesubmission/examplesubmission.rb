use_bpm 70

tonic1 = :e3
tonic2 = :b2

live_loop :drums do
  sample :bd_haus, amp: 2, cutoff: 110
  sleep 0.5
  sample :drum_snare_soft, amp: 0.7, cutoff: 110
  sleep 0.25
  sample :perc_snap, amp: 0.4
  sleep 0.25
  sample :bd_haus, amp: 2, cutoff: 100
  sleep 0.5
  sample :drum_snare_soft, amp: 0.6, rate: 1.5, release: 0.2
  sleep 0.25
  sample :drum_snare_soft, amp: 0.6, rate: 1.5, release: 0.2
  sleep 0.25
  if tick % 4 == 0
    sample :sn_dub, amp: 0.5, rate: 0.8
  end
end

live_loop :hihat, sync: :drums do
  6.times do
    sample :drum_cymbal_closed, amp: 0.4, rate: 1.2
    sleep 0.25
  end
  sleep 0.5
  sample :drum_cymbal_open, sustain: 0.3, amp: 0.3
  sleep 1
end

live_loop :bassline do
  use_synth :fm
  use_random_seed 303
  8.times do
    play (scale tonic1, :minor_pentatonic).choose, release: 0.8, amp: 1.4, cutoff: rrand(60, 100)
    sleep [0.5, 0.25, 0.75].choose
  end
  sleep 8
end

live_loop :melody1, sync: :drums do
  use_synth :piano
  with_fx :reverb, room: 0.7, mix: 0.5 do
    play chord(tonic1 + 12, :m7), release: 2, amp: 0.8
    sleep 2
    play chord(tonic1 + 7, :m7), release: 2, amp: 0.8
    sleep 2
    play chord(tonic1 + 5, :m7), release: 2, amp: 0.8
    sleep 2
  end
end

live_loop :countermelody do
  sync :melody1
  use_synth :pluck
  with_fx :echo, phase: 0.25, decay: 2 do
    sleep 4
    8.times do
      play (scale tonic1 + 12, :minor_pentatonic).choose, release: 0.8, amp: 0.5
      sleep [0.5, 0.25].choose
    end
  end
end

live_loop :pad, sync: :drums do
  use_synth :hollow
  with_fx :slicer, phase: 0.25, wave: 0, mix: 0.2 do
    play chord(tonic1 - 12, :m7), attack: 2, release: 8, amp: 0.6
    sleep 8
  end
end

live_loop :vinyl do
  sample :vinyl_hiss, amp: 0.25, attack: 1, release: 4
  sleep 4
end

live_loop :tonic_change do
  sync :drums
  sleep 64
  tonic1 = tonic2
end

live_loop :new_melody do
  sync :tonic_change
  stop
  live_loop :melody2 do
    use_synth :prophet
    play chord(tonic2 + 12, :m9), release: 2, amp: 0.8
    sleep 2
    play chord(tonic2 + 7, :m9), release: 2, amp: 0.8
    sleep 2
    play chord(tonic2 + 5, :m9), release: 2, amp: 0.8
    sleep 2
  end
end

live_loop :glitch_effect do
  sync :drums
  sleep 48
  with_fx :bitcrusher, bits: 4, amp: 0.5 do
    sample :loop_amen, rate: -0.75, finish: 0.25, amp: 0.5
    sleep 4
  end
end

live_loop :tape_stop do
  sync :drums
  sleep 96
  with_fx :wobble, phase: 0.3 do
    sample :guit_harmonics, rate: -0.5, amp: 0.5
    sleep 2
  end
end

live_loop :ambience do
  sync :drums
  sample :ambi_piano, rate: -0.5, amp: 0.3
  sleep 8
end
