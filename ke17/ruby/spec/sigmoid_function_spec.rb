require_relative '../simple_ke17_lib.rb'

describe 'gen_sigmoid' do
  context 'with no arguments' do
    let(:sigmoid) { gen_sigmoid() }

    it 'should return standard sigmoid function', do
      sigmoid[1].should == 0.5
    end
  end
end