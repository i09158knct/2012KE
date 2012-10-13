require_relative '../ke17_lib.rb'

describe "genSigmoid" do
  context "with no arguments" do
    let(:sigmoid) { genSigmoid() }

    it 'should return standard sigmoid function', do
      sigmoid[1].should == 0.5
    end
  end
end