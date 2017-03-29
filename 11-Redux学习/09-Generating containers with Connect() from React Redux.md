# Generating Containers with connect() from React Redux

### Usage

    function mapStateToProps(state){
        return someProps;  // someProps will be updated anytime state changes !
    }
    
    function mapDispatchToProps(dispatch){
        return {
            xxx: dispatch({
                xxx
            });
        }
    }   
    
    var component = connect(mapStateToProps, mapDispatchToProps)(someComponent);